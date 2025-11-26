// import  User  from "./user.model";  // Assuming you have a User model (mongoose or other)

// export const userResolvers = {
//   Query: {
//     getUsers: async (_: any, __: any, { userId }: { userId: string }) => {
//       if (!userId) throw new Error("Unauthorized");
//       return User.find({ _id: { $ne: userId } });  // Fetch all users except the logged-in user
//     },
//   },
// };
