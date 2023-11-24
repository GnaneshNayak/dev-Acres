import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <section>
      <div className=" flex w-full justify-between gap-4 sm:flex-row sm:items-center">
        <h1
          className="h1-bold text-dark100_light900
        "
        >
          All User
        </h1>
      </div>
      <div
        className="mb-12 mt-11 flex flex-wrap items-center justify-between 
    gap-5"
      >
        <Skeleton className="h-14 flex-1" />

        <Skeleton className="h-14 w-28" />
      </div>
      <div
        className="mt-12 flex w-full grow flex-wrap items-center justify-center
    gap-4  "
      >
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={1} className="h-60 w-full rounded-2xl xs:w-[260px]" />
        ))}
      </div>
    </section>
  );
};

export default Loading;
