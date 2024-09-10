export const userMock = {
  id: 1,
  nickname: 'mockUser',
  fullName: 'mockUser mockUser',
  karma: 42,
  description: 'mockUser mockUser',
  rating: 4242,
  avatar: 'https://example.com/avatar.jpg',
  roles: [{ id: 2, value: 'USER', description: 'USER role' }],
}

export const userAdminMock = {
  ...userMock,
  roles: [
    ...userMock.roles,
    { id: 1, value: 'ADMIN', description: 'ADMIN role' },
  ],
}

export const userModeratorMock = {
  ...userMock,
  roles: [
    ...userMock.roles,
    { id: 3, value: 'MODERATOR', description: 'MODERATOR role' },
  ],
}

export const userAdminModeratorMock = {
  ...userMock,
  roles: [
    ...userMock.roles,
    { id: 1, value: 'ADMIN', description: 'ADMIN role' },
    { id: 3, value: 'MODERATOR', description: 'MODERATOR role' },
  ],
}
