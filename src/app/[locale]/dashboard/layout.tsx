import SideNav from "./_components/side-nav"
import Nav from "@/components/common/nav"
type DashboardLayoutProp={
  children:React.ReactNode;
}
export default function DashboardLayout({children}:DashboardLayoutProp){
  return(
    <>
    
      <main className="grid grid-cols-6 h-screen">
      <section className='col-span-1'>
       <SideNav></SideNav>
      </section>
      <div className='col-span-5'>
        <Nav></Nav>
      {children}
      </div>
      
       
 
      </main>
      
      </>
      );
}
