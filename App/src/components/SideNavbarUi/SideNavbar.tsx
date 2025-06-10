/* eslint-disable @typescript-eslint/no-explicit-any */
import AppLogo from "../icons/AppLogo";
import NavFields from "./NavFields";
import ShareIcon from "../icons/ShareIcon";
import TwitterIcon from "../icons/TwitterIcon";
import YoutubeIcon from "../icons/YoutubeIcon";
import DocumentIcon from "../icons/DocumentIcon";
import All from "../icons/All";

interface SideNavbarProps {
  data1 : any,
  setData: any,
  setYTData:any,
  setNitionData: any,
  setDataShow: any,
  // setTWData:any
}


const SideNavbar = (props: SideNavbarProps)=>{
  function yt(){
    const ytData = props.data1.filter((item: any) => item.contentType === "Youtube");
    props.setYTData(ytData);
    props.setDataShow("Youtube");
  }

  function nt(){
    const ntData = props.data1.filter((item: any) => item.contentType === "Notion" ||  item.contentType === "Twitter");
    props.setNitionData(ntData);
    props.setDataShow("Notion");
  }

  // function tw(){
  //   const twData = props.data1.filter((item: any) =>  item.contentType === "Twitter");
  //   props.setTWData(twData);
  //   props.setDataShow("Twitter");
  // }

  function al(){
    props.setDataShow("All")
  }
  return <>
    <div className="w-[20vw] h-screen border-r-2 inline-block">
        <div className="flex gap-2 ml-3 pt-3">
         <div className=" size-10 justify-center items-center pt-1 pr-1"> <AppLogo /> </div> <span className="text-[27px] font-bold pl-2">Brainly</span>
        </div>
        <div className="pt-7 cursor-pointer">
          <div onClick={al}><NavFields text={"All"} startIcon={<All />} /></div>
          <div onClick={yt}><NavFields text={"Youtube"} startIcon={<YoutubeIcon />} /></div>
          <div onClick={nt}><NavFields text={"Documents"} startIcon={<DocumentIcon />} /></div>
          <div onClick={nt}><NavFields text={"Twitter"} startIcon={<TwitterIcon/>} /></div>
        </div>
    </div> 
  </>
}

export default SideNavbar;