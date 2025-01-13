import SideNav from '../_components/side-nav';
import Nav from '@/components/common/nav';
type DashboardLayoutProp={
    children:React.ReactNode;
}
export default function DashboardLayout({children}:DashboardLayoutProp){
    return(
      <>
       <h1 className=" bg-[#4461F2] text-white text-center px-4 py-5 text-3xl font-bold">Dashboard</h1>
        <main className="grid grid-cols-4 h-screen">
        <section className='col-span-1'>
         <SideNav></SideNav>
        </section>
        <div className='col-span-3'>
          <Nav></Nav>
        {children}
        </div>
        
         
   
        </main>
        
        </>
    );

}
