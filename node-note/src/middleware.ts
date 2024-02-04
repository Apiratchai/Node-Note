import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware( {
  publicRoutes: ["/","/AboutUs"],
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};