export function requirePermission(_moduleCode, _actionCode) {
  return async (_req, _res, next) => {
    // TODO: enforce role/permission from DB (As-Is matrix)
    return next();
  };
}
