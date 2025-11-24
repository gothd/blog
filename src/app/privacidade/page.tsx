import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidade',
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 text-hub-gray md:px-6 md:py-16">
      <h1 className="mb-8 text-4xl font-bold text-hub-dark">
        Política de Privacidade
      </h1>

      <div className="space-y-6 leading-relaxed">
        <p>
          A sua privacidade é importante para nós. É política do Ruan Hub
          respeitar a sua privacidade em relação a qualquer informação sua que
          possamos coletar no site Ruan Hub.
        </p>

        <h2 className="text-xl font-bold text-hub-dark">Coleta de Dados</h2>
        <p>
          Solicitamos informações pessoais (como o envio de mensagens de
          feedback) apenas quando realmente precisamos delas para lhe fornecer
          um serviço. Fazemo-lo por meios justos e legais, com o seu
          conhecimento e consentimento.
        </p>

        <h2 className="text-xl font-bold text-hub-dark">
          Armazenamento Local e Cookies
        </h2>
        <p>
          O Ruan Hub não utiliza cookies de rastreamento publicitário ou
          analítico próprios. Utilizamos apenas tecnologias essenciais para o
          funcionamento do site:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Armazenamento Local (LocalStorage):</strong> Utilizamos para
            lembrar suas preferências de interação, como por exemplo, se você já
            avaliou um artigo, evitando que solicitemos o mesmo feedback
            repetidamente.
          </li>
          <li>
            <strong>Segurança (Google reCAPTCHA):</strong> Utilizamos o serviço
            reCAPTCHA do Google para proteger nosso site contra spam e abusos.
            Este serviço pode utilizar cookies e coletar dados de navegação
            necessários exclusivamente para fins de segurança.
          </li>
        </ul>

        <h2 className="text-xl font-bold text-hub-dark">
          Links de Terceiros e Afiliados
        </h2>
        <p>
          Nosso site contém links para sites externos (plataformas de afiliados
          como Hotmart, Eduzz, entre outros). Esteja ciente de que, ao clicar
          nesses links, você será redirecionado para ambientes externos que
          podem utilizar seus próprios cookies para rastrear a origem da venda
          (o que garante nossa comissão). Não temos controle sobre as políticas
          de privacidade desses sites.
        </p>

        <h2 className="text-xl font-bold text-hub-dark">
          Compromisso do Usuário
        </h2>
        <p>
          O usuário se compromete a fazer uso adequado dos conteúdos e da
          informação que o Ruan Hub oferece no site e com caráter enunciativo,
          mas não limitativo:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Não se envolver em atividades que sejam ilegais ou contrárias à boa
            fé a à ordem pública;
          </li>
          <li>
            Não difundir propaganda ou conteúdo de natureza racista, xenofóbica,
            de azar, qualquer tipo de pornografia ilegal, de apologia ao
            terrorismo ou contra os direitos humanos.
          </li>
        </ul>
      </div>
    </article>
  );
}
