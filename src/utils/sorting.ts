export const sortUsersByName = (users: any[]) => {
    return users.sort((a, b) => a.name.localeCompare(b.name));
  };
  