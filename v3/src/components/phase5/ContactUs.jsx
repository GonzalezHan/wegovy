

const ContactUs = () => {
  return (
    <section className="h-full w-full flex flex-col items-center justify-center relative bg-transparent text-white px-6 pointer-events-auto">
      <div className="text-center w-full max-w-4xl">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-snug mb-10 text-white break-keep pb-4">
          여러분의 페인포인트(Pain-point)가<br/>
          자동화의 시작입니다.
        </h2>
        
        <div className="text-lg md:text-xl lg:text-2xl font-light opacity-90 leading-relaxed mb-16 break-keep">
          <p className="mb-2">"이것도 자동화가 될까?" 망설이지 마세요.</p>
          <p>재무자동화 TF가 여러분의 업무 시간에 여유를 찾아드리겠습니다.</p>
        </div>

        <button className="bg-[#2CD9B3] hover:bg-[#20b896] text-slate-900 font-bold text-lg md:text-xl py-5 px-10 rounded-full shadow-xl transition-transform transform hover:scale-105">
          자동화 아이디어 제안하기
        </button>
      </div>
    </section>
  );
};

export default ContactUs;
