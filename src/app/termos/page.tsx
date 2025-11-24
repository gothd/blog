import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Termos de Uso',
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 text-hub-gray md:px-6 md:py-16">
      <h1 className="mb-8 text-4xl font-bold text-hub-dark">Termos de Uso</h1>

      <div className="space-y-6 leading-relaxed">
        <h2 className="text-xl font-bold text-hub-dark">1. Termos</h2>
        <p>
          Ao acessar ao site Ruan Hub, concorda em cumprir estes termos de
          serviço, todas as leis e regulamentos aplicáveis ​​e concorda que é
          responsável pelo cumprimento de todas as leis locais aplicáveis. Se
          você não concordar com algum desses termos, está proibido de usar ou
          acessar este site.
        </p>

        <h2 className="text-xl font-bold text-hub-dark">
          2. Isenção de Responsabilidade
        </h2>
        <p>
          Os materiais no site da Ruan Hub são fornecidos &apos;como
          estão&apos;. Ruan Hub não oferece garantias, expressas ou implícitas,
          e, por este meio, isenta e nega todas as outras garantias, incluindo,
          sem limitação, garantias implícitas ou condições de comercialização,
          adequação a um fim específico ou não violação de propriedade
          intelectual ou outra violação de direitos.
        </p>
        <p>
          Além disso, o Ruan Hub atua como um divulgador de produtos digitais e
          físicos através de programas de afiliação. Não somos responsáveis pela
          entrega, qualidade ou suporte dos produtos vendidos por terceiros.
        </p>

        <h2 className="text-xl font-bold text-hub-dark">
          3. Precisão dos materiais
        </h2>
        <p>
          Os materiais exibidos no site da Ruan Hub podem incluir erros
          técnicos, tipográficos ou fotográficos. Ruan Hub não garante que
          qualquer material em seu site seja preciso, completo ou atual. Ruan
          Hub pode fazer alterações nos materiais contidos em seu site a
          qualquer momento, sem aviso prévio.
        </p>

        <h2 className="text-xl font-bold text-hub-dark">4. Modificações</h2>
        <p>
          O Ruan Hub pode revisar estes termos de serviço do site a qualquer
          momento, sem aviso prévio. Ao usar este site, você concorda em ficar
          vinculado à versão atual desses termos de serviço.
        </p>
      </div>
    </article>
  );
}
