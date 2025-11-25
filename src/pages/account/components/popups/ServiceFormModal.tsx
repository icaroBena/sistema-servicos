// src/pages/account/components/popups/ServiceFormModal.tsx

import React, { useEffect, useRef, useState } from "react";
import { FiEdit } from "react-icons/fi";
import "./service-form-modal.css";
import type { Service } from "../../../../models/Servico";

interface Props {
  existing?: Service | null;
  onClose: () => void;
  onSave: (data: Service) => void;
}

// TEMPORÁRIO — substituir por categorias do backend
const CATEGORIES = ["Elétrica", "Hidráulica", "Pintura", "Limpeza", "Montagem de Móveis"];

const ServiceFormModal: React.FC<Props> = ({ existing = null, onClose, onSave }) => {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  // 🔄 Carregar dados no modo edição
  useEffect(() => {
    if (existing) {
      setImageUrl(existing.imageUrl ?? null);
      setTitle(existing.title);
      setDescription(existing.description ?? "");
      setCategory(existing.category);
      setPrice(String(existing.price ?? ""));
    } else {
      setImageUrl(null);
      setTitle("");
      setDescription("");
      setCategory("");
      setPrice("");
    }

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [existing]);

  // 💰 Formatar preço
  const formatCurrency = (value: string) => {
    const digits = value.replace(/\D/g, "");
    const number = Number(digits) / 100;
    return number.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") return setPrice("");
    setPrice(formatCurrency(e.target.value));
  };

  // 📸 Upload de imagem
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (objectUrl) URL.revokeObjectURL(objectUrl);

    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setObjectUrl(url);
  };

  // Barre de elegibilidade (mantida sua lógica)
  const score = (() => {
    let s = 0;
    if (title.length >= 10) s += 25;
    if (title.length >= 20) s += 5;
    if (description.length >= 40) s += 25;
    if (description.length >= 80) s += 5;
    if (imageUrl) s += 25;

    const priceNumber = Number(price.replace(/\D/g, "")) / 100;
    if (priceNumber >= 50 && priceNumber <= 300) s += 20;

    return Math.min(100, s);
  })();

  const barClass =
    score < 30 ? "low" : score < 60 ? "mid" : score < 85 ? "good" : "great";

  // 🧪 Mensagens de recomendação
  const suggestions: string[] = [];
  if (!imageUrl) suggestions.push("Adicione uma imagem.");
  if (title.length < 10) suggestions.push("Aumente o título (mín. 10 caracteres).");
  if (description.length < 40) suggestions.push("Descreva melhor o serviço (mín. 40 caracteres).");

  const priceNumber = Number(price.replace(/\D/g, "")) / 100;
  if (!(priceNumber >= 50 && priceNumber <= 300))
    suggestions.push("Defina um preço entre R$ 50 e R$ 300.");

  // ✔ Validação antes de salvar
  const validate = () => {
    if (title.trim() === "") return "O título é obrigatório.";
    if (title.length < 1 || title.length > 30) return "Título deve ter 1–30 caracteres.";
    if (description.length > 150) return "Descrição deve ter até 150 caracteres.";
    if (!category) return "Escolha uma categoria.";
    if (priceNumber <= 0 || isNaN(priceNumber)) return "Defina um valor válido.";
    return null;
  };

  // 💾 Salvar serviço padronizado
  const save = () => {
    const error = validate();
    if (error) return alert(error);

    const priceNumber = Number(price.replace(/\D/g, "")) / 100;

    const item: Service = {
      id: existing?.id ?? Date.now().toString(),
      title,
      description,
      category,
      price: priceNumber,
      imageUrl,
      createdAt: existing?.createdAt ?? new Date().toISOString(),
    };

    onSave(item);
  };

  return (
    <div className="modal-bg">
      <div className="modal-box">
        <h2>{existing ? "Editar Serviço" : "Criar Serviço"}</h2>

        <div className="grid">
          {/* Imagem */}
          <div className="img-upload" onClick={() => fileRef.current?.click()}>
            {imageUrl ? (
              <img src={imageUrl} className="preview-img" />
            ) : (
              <div className="placeholder">Clique para adicionar imagem</div>
            )}

            <button
              className="edit-icon"
              onClick={(e) => {
                e.stopPropagation();
                fileRef.current?.click();
              }}
            >
              <FiEdit size={18} />
            </button>

            <input hidden ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} />
          </div>

          {/* Campos */}
          <div className="fields">
            <label>Título ({title.length}/30)</label>
            <input value={title} maxLength={30} onChange={(e) => setTitle(e.target.value)} />

            <label>Descrição ({description.length}/150)</label>
            <textarea value={description} maxLength={150} onChange={(e) => setDescription(e.target.value)} />
          </div>
        </div>

        {/* Categoria e Preço */}
        <div className="row split">
          <div>
            <label>Categoria</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Selecionar...</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Preço</label>
            <input value={price} placeholder="R$ 0,00" onChange={handlePrice} />
          </div>
        </div>

        {/* Barra */}
        <div className="elig">
          <div className={`elig-bar ${barClass}`} style={{ width: `${score}%` }} />
        </div>

        {/* Sugestões */}
        {suggestions.length > 0 ? (
          <ul className="sugestoes">
            {suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        ) : (
          <p className="good-msg">✓ Seu serviço está bem estruturado!</p>
        )}

        {/* Botões */}
        <div className="btns">
          <button className="cancel" onClick={onClose}>Cancelar</button>
          <button className="save" onClick={save}>Salvar</button>
        </div>
      </div>
    </div>
  );
};

export default ServiceFormModal;
