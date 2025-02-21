export function CallInfo() {
  return (
    <div className="!grid !grid-cols-3 gap-4 w-full max-md:!grid-cols-1">
      <div className="bg-slate-100 rounded-md py-5 px-6 h-full flex flex-col gap-4">
        <h1 className="font-semibold text-xl text-gray-900">
          Faça <i>upcycling</i> da sua peça de seda
        </h1>
        <p className="text-[#232323]/65">
          O upcycling dá vida nova ao tecido de seda de artigos com valor
          sentimental para você.
        </p>
      </div>
      <div className="bg-slate-100 rounded-md py-5 px-6 h-full flex flex-col gap-4">
        <h1 className="font-semibold text-xl text-gray-900">
          Compre artigos com seda
        </h1>
        <p className="text-[#232323]/65">
          Designer de Moda com especialização em sustentabilidade.
        </p>
      </div>
      <div className="bg-slate-100 rounded-md py-5 px-6 h-full flex flex-col gap-4">
        <h1 className="font-semibold text-xl text-gray-900">
          Venda peças com etiqueta Serviço Rápido
        </h1>
        <p className="text-[#232323]/65">
          As peças produzidas pelos designers e artesãs inscritos na Serviço Rápido
          são acompanhadas de certificado de origem com etiqueta holográfica de
          numeração única que permitem sua revenda na plataforma.
        </p>
      </div>
    </div>
  );
}
