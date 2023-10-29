import Question from '@/components/form/Question';

export default function Home() {
  return (
    <>
      <div>
        <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      </div>
      <div className="mt-9">
        <Question />
      </div>
    </>
  );
}
