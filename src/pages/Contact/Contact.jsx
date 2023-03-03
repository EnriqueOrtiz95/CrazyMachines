import { Helmet } from "react-helmet-async";
import styles from "./Contact.module.css";
import { GoLocation } from "react-icons/go";
import { BsFillTelephoneFill } from "react-icons/bs";
import { HiOutlineMailOpen } from "react-icons/hi";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Crazy Machines | Contact</title>
        <meta name="description" content="Crazy Machine's Contact" />
      </Helmet>

      <section id="contact" className={`bg-cyan-cust text-white-cust ${styles.oswald}`}>
        <h1>GET IN TOUCH</h1>
        <div className="flex flex-col md:flex-row gap-6 items-center justify-around flex-wrap ">
          <div className="flex flex-col items-center justify-center md:w-1/3 text-center">
            <div className="p-8 rounded-full bg-white-cust opacity-75 hover:scale-110">
              <GoLocation className="text-5xl text-black-cust" />
            </div>
            <h2>ADDRESS</h2>
            <h3 className="text-2xl font-bold pb-4">USA</h3>
            <p className="text-lg pb-8 h-[70px] md:h-[95px]">2222 Century Cir, Irving TX 75062 U.S.A</p>

            <h3 className="text-2xl font-bold pb-4">MEXICO</h3>
            <p className="text-lg pb-8 h-[70px] md:h-[95px]">Av. de las Torres 1000, Col. Lomas de Chapultepec, C.P. 11000, CDMX, México</p>

            <h3 className="text-2xl font-bold pb-4">CHINA</h3>
            <p className="text-lg pb-8 h-[70px] md:h-[95px]">No. 1, Lane 1, Xinghua Road, Xinghua Industrial Park, Xinghua, Jiangsu, China</p>

            <h3 className="text-2xl font-bold pb-4">CHILE</h3>
            <p className="text-lg pb-8 h-[70px] md:h-[95px]">Av. Andrés Bello 3000, Las Condes, Santiago, Chile</p>

            <h3 className="text-2xl font-bold pb-4">SOUTH KOREA</h3>
            <p className="text-lg pb-8 h-[70px] md:h-[95px]">No. 704-1, Gongjang-dong, Ilsan Techno Town, 138, Ilsan-ro, Ilsandong-gu, Goyang-si, Gyeonggi-do, Republic of Korea</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="p-8 rounded-full bg-white-cust opacity-75 hover:scale-110">
              <BsFillTelephoneFill className="text-5xl text-black-cust" />
            </div>
            <h2>PHONE</h2>
            <h3 className="text-2xl font-bold pb-4">USA</h3>
            <p className="text-lg pb-8 h-[70px] md:h-[95px]">+(281) 123-456-6789</p>

            <h3 className="text-2xl font-bold pb-4">MEXICO</h3>
            <p className="text-lg pb-8 h-[70px] md:h-[95px]">+(52) 987-654-3210</p>

            <h3 className="text-2xl font-bold pb-4">CHINA</h3>
            <p className="text-lg pb-8 h-[70px] md:h-[95px]">+(852) 111-222-3344</p>

            <h3 className="text-2xl font-bold pb-4">CHILE</h3>
            <p className="text-lg pb-8 h-[70px] md:h-[95px]">+(809) 999-888-7766</p>

            <h3 className="text-2xl font-bold pb-4">SOUTH KOREA</h3>
            <p className="text-lg pb-8 h-[70px] md:h-[95px]">+(2) 135-792-4680</p>

          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="p-8 rounded-full bg-white-cust opacity-75 hover:scale-110">
              <HiOutlineMailOpen className="text-5xl text-black-cust" />
            </div>
            <h2>EMAIL</h2>
            <h3 className="text-2xl font-bold pb-4">USA</h3>
            <p className="text-lg pb-8 h-[70px] md:h-[95px]">crazymachines@service.com</p>

            <h3 className="text-2xl font-bold pb-4">MEXICO</h3>
            <p className="text-lg pb-8 h-[70px] md:h-[95px]">crazymachines@services.com.mx</p>

            <h3 className="text-2xl font-bold pb-4">CHINA</h3>
            <p className="text-lg pb-8 h-[70px] md:h-[95px]">crazymachines@services.com.cn</p>

            <h3 className="text-2xl font-bold pb-4">CHILE</h3>
            <p className="text-lg pb-8 h-[70px] md:h-[95px]">crazymachines@services.com.cl</p>

            <h3 className="text-2xl font-bold pb-4">SOUTH KOREA</h3>
            <p className="text-lg pb-8 h-[70px] md:h-[95px]">crazymachines@services.com.kr</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
