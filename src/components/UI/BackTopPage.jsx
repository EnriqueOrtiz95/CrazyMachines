import {AiOutlineArrowUp} from "react-icons/ai";

const BackTopPage = () => {
  return (
    <div className="back bg-black-cust w-[50px] h-[50px] fixed bottom-20 right-10">
        <a href="#top">
          <AiOutlineArrowUp className="text-5xl text-white-cust transition-colors hover:text-stone-600" />
        </a>
      </div>
  )
}

export default BackTopPage