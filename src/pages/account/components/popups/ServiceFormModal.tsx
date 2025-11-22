import React, { useEffect, useRef, useState } from "react";
import { FiEdit } from "react-icons/fi";
import "./service-form-modal.css";
import type { Servico } from "../../../../models/Servico";

interface Props {
    existing?: Servico | null;
    onClose: () => void;
    onSave: (data: Servico) => void;
}

// temporário: categorias mock (substituir por fetch do backend)
const categorias = [
    "Elétrica",
    "Hidráulica",
    "Pintura",
    "Limpeza",
    "Montagem de Móveis",
];

const ServiceFormModal: React.FC<Props> = ({ existing = null, onClose, onSave }) => {
    const fileRef = useRef<HTMLInputElement | null>(null);
    const [image, setImage] = useState<string | null>(null);
    const [localObjectURL, setLocalObjectURL] = useState<string | null>(null); // para cleanup
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [categoria, setCategoria] = useState("");
    const [preco, setPreco] = useState("");

    // inicializa com existing quando abrir em modo edição
    useEffect(() => {
        if (existing) {
            setImage(existing.imagemUrl ?? null);
            setTitulo(existing.titulo ?? "");
            setDescricao(existing.descricao ?? "");
            setCategoria(existing.categoria ?? "");
            setPreco(existing.preco ?? "");
        } else {
            setImage(null);
            setTitulo("");
            setDescricao("");
            setCategoria("");
            setPreco("");
        }
        // limpa eventuais object URLs anteriores
        return () => {
            if (localObjectURL) {
                URL.revokeObjectURL(localObjectURL);
                setLocalObjectURL(null);
            }
        };
    }, [existing]);

    const formatarPreco = (v: string) => {
        const digits = v.replace(/\D/g, "");
        const num = Number(digits || "0") / 100;
        return num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    };

    const handlePreco = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        // permitir apagar tudo
        if (raw === "") {
            setPreco("");
            return;
        }
        setPreco(formatarPreco(raw));
    };

    // -------- Upload de imagem --------
    const handleImagem = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        // revogar antigo
        if (localObjectURL) {
            URL.revokeObjectURL(localObjectURL);
            setLocalObjectURL(null);
        }
        const url = URL.createObjectURL(file);
        setImage(url);
        setLocalObjectURL(url);
    };

    // -------- Barra de elegibilidade --------
    const calcScore = () => {
        let score = 0;

        // título (1-30): preferível >=10 e >=20
        if (titulo.length >= 10) score += 25;
        if (titulo.length >= 20) score += 5;

        // descrição (0-150): preferível >=40 e >=80
        if (descricao.length >= 40) score += 25;
        if (descricao.length >= 80) score += 5;

        // imagem
        if (image) score += 25;

        // preço (numérico)
        const precoNum = Number(preco.replace(/\D/g, "")) / 100;
        if (!isNaN(precoNum) && precoNum > 0 && precoNum >= 50 && precoNum <= 300) score += 20;

        return Math.min(score, 100);
    };

    const score = calcScore();
    const barraClass = score < 30 ? "low" : score < 60 ? "mid" : score < 85 ? "good" : "great";

    // sugestões textuais
    const sugestoes: string[] = [];
    if (!image) sugestoes.push("Adicione uma imagem.");
    if (titulo.trim().length < 10) sugestoes.push("Aumente o título (10–30 caracteres).");
    if (descricao.trim().length < 40) sugestoes.push("Descreva melhor o serviço (≥ 40 caracteres).");
    const precoNum = Number(preco.replace(/\D/g, "")) / 100;
    if (!(precoNum >= 50 && precoNum <= 300)) sugestoes.push("Defina um preço dentro de um intervalo realista (ex.: R$ 50–300).");

    // validação antes de salvar
    const validar = () => {
        if (!titulo.trim()) return "O título é obrigatório.";
        if (titulo.trim().length < 1 || titulo.trim().length > 30) return "Título deve ter entre 1 e 30 caracteres.";
        if (descricao.length > 150) return "Descrição muito longa (máx. 150 caracteres).";
        if (!categoria) return "Escolha uma categoria.";
        const precoNumber = Number(preco.replace(/\D/g, "")) / 100;
        if (isNaN(precoNumber) || precoNumber <= 0) return "Defina um preço válido.";
        return null;
    };

    // salvar (retorna ServicoLocal)
    const salvar = () => {
        const err = validar();
        if (err) {
            alert(err);
            return;
        }

        const item: Servico = {
            id: existing?.id ?? Date.now().toString(),
            titulo: titulo.trim(),
            descricao: descricao.trim(),
            categoria,
            preco: preco || formatarPreco("0"),
            imagemUrl: image,
            data: existing?.data ?? new Date().toISOString(),
        };

        onSave(item);
    };

    return (
        <div className="modal-bg" role="dialog" aria-modal="true">
            <div className="modal-box">
                <h2>{existing ? "Editar Serviço" : "Criar Serviço"}</h2>

                <div className="grid">
                    {/* IMAGEM */}
                    <div
                        className="img-upload"
                        onClick={() => fileRef.current?.click()}
                        role="button"
                        aria-label="Upload de imagem"
                    >
                        {image ? (
                            <img src={image} className="preview-img" alt="preview" />
                        ) : (
                            <div className="placeholder">Clique para adicionar imagem</div>
                        )}

                        <button
                            className="edit-icon"
                            onClick={(e) => {
                                e.stopPropagation();
                                fileRef.current?.click();
                            }}
                            aria-label="Editar imagem"
                        >
                            <FiEdit size={18} />
                        </button>

                        <input
                            type="file"
                            ref={fileRef}
                            accept="image/*"
                            onChange={handleImagem}
                            hidden
                        />
                    </div>

                    {/* CAMPOS */}
                    <div className="fields">
                        <div className="row">
                            <label htmlFor="titulo">Título ({titulo.length}/30)</label>
                            <input
                                id="titulo"
                                maxLength={30}
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                            />
                        </div>

                        <div className="row">
                            <label className="row label" htmlFor="descricao">Descrição ({descricao.length}/150)</label>
                            <textarea
                                id="descricao"
                                maxLength={150}
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* CATEGORIA / PREÇO */}
                <div className="row split">
                    <div>
                        <label htmlFor="categoria">Categoria</label>
                        <select id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                            <option value="">Selecionar...</option>
                            {categorias.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="preco">Preço médio</label>
                        <input
                            id="preco"
                            placeholder="R$ 0,00"
                            value={preco}
                            onChange={handlePreco}
                        />
                    </div>
                </div>

                {/* BARRA */}
                <div className="elig" aria-hidden>
                    <div
                        className={`elig-bar ${barraClass}`}
                        style={{ width: `${score}%` }}
                    />
                </div>

                {/* SUGESTÕES */}
                {sugestoes.length > 0 ? (
                    <ul className="sugestoes" aria-live="polite">
                        {sugestoes.map((s, i) => (
                            <li key={i}>{s}</li>
                        ))}
                    </ul>
                ) : (
                    <p style={{ marginTop: 10, color: "#0a7f3a", fontWeight: 600 }}>
                        ✓ Seu serviço está bem estruturado!
                    </p>
                )}

                <div className="btns">
                    <button className="cancel" onClick={onClose}>
                        Cancelar
                    </button>
                    <button className="save" onClick={salvar}>
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServiceFormModal;