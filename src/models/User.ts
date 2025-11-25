// Deprecated compatibility file.
// Models are defined in Portuguese filenames (e.g. `Usuario.tsx`) but export
// English type names internally. This file re-exports the type to keep
// existing imports working while we standardize the codebase.
export type { User } from "./Usuario";

