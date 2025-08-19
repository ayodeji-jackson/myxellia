import { useState, type Dispatch, type FC, type JSX, type SetStateAction } from "react";
import { Bell, Calc, Calendar as CalendarIcon, Logo, Message, DashboardIcon, ListingsIcon, UsersIcon, RequestIcon, ApplicationsIcon, Search, ArrowUp, ListingsOverview, UsersOverview, AngleRight, MessagesBold, CalcBold, Settings, TrendUp, AlignBottom, RightArrow } from "./assets/icons";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  type ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Calendar } from '@/components/ui/calendar';
import { ArrowLeft, X } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Legend);

interface IData { 
  price: number
  name: string
  rate: number
  color: string
}

interface ICard {
  name: string,
  icon: () => JSX.Element
  data: { 
    name: string 
    count: number 
  }[]
}

type Links = 'dashboard' | 'listings' | 'users' | 'request' | 'applications';

function App() {
  const links: Record<Links, () => JSX.Element> = {
    dashboard: DashboardIcon,
    listings: ListingsIcon,
    users: UsersIcon,
    request: RequestIcon,
    applications: ApplicationsIcon
  };
  const cards: ICard[] = [
    { 
      name: 'listings',
      icon: ListingsOverview, 
      data: [
        { name: 'total', count: 1800 },
        { name: 'active', count: 80 },
        { name: 'archived', count: 1000 },
      ]
    },
    { 
      name: 'users',
      icon: UsersOverview, 
      data: [
        { name: 'total', count: 20700 },
        { name: 'riders', count: 8500 },
        { name: 'subscribers', count: 7500 },
      ]
    }
  ];
  const name = "Ahmed D.";
  const data: IData[] = [
    { price: 120_000_000, name: 'Total Inflow', rate: 2.5, color: '#4545FE' },
    { price: 50_000_000, name: 'MRR', rate: 2.5, color: '#12B76A' },
    { price: 200_000_000, name: 'Commission Revenue', rate: 0.5, color: '#14B8A6' },
    { price: 100_000_000, name: 'GMV', rate: 0.5, color: '#F04438' },
  ];

  const [activeFilter, setActiveFilter] = useState('year');
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isCalendarOpen, setIsCalendarOpen] = useState(false); 
  const [date, setDate] = useState<Date | undefined>(new Date());

  const FilterButton: FC<{ name: string }> = ({ name }) => 
    <button data-is-active={activeFilter == name} onClick={() => setActiveFilter(name)} className="w-20 py-2 rounded-lg data-[is-active=true]:bg-gray hover:bg-gray data-[is-active=true]:font-semibold capitalize text-deep-gray">
      1 {name}
    </button>;

  addEventListener('keydown', e => e.key === 'Escape' && setIsModalOpen(false));

  return (
    <>
      <header className='bg-primary h-[82px] border-b border-gray-100'>
        <div className="max-w-7xls mx-auto flex items-center h-full gap-6 *:not-first:hidden sm:*:not-first:[display:initial]">
          <a href="/"><Logo /></a>
          <button className="ml-auto"><Bell /></button>
          <div>
            <button onClick={() => setIsModalOpen(true)} className="relative group block">
              <CalcBold />
              <p role='tooltip' className="text-gray-100 text-xs absolute -bottom-12 bg-black p-3 rounded-lg -translate-x-1/2 left-1/2 shadow-2xl hidden group-hover:block">Budgeting</p>
            </button>
            <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
          </div>
          <div>
            <button className="relative group block" onClick={() => setIsCalendarOpen(true)}>
              <CalendarIcon />
              <p role='tooltip' className="text-gray-100 text-xs absolute -bottom-12 bg-black p-3 rounded-lg -translate-x-1/2 left-1/2 shadow-2xl hidden group-hover:block">Calendar</p>
            </button>
            <div hidden={!isCalendarOpen} className="fixed top-[81px] w-[400px] text-white bg-[#0D0D0D] right-0 font-euclid h-full z-[3]">
              <div className="gap-2 flex items-center pl-[22.75px] pr-6 bg-primary h-[50px] mb-[17px]">
                <button onClick={() => setIsCalendarOpen(false)}><ArrowLeft /></button>
                <h2>Calendar</h2>
                <button className="ml-auto" onClick={() => setIsCalendarOpen(false)}><X /></button>
              </div>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="text-[#969696] px-5 mx-auto w-full bg-inherit [&_.rdp-day]:border-y-[0.47px] [&_.rdp-day]:border-r-[0.47px] [&_.rdp-day]:first:border-l-[0.47px] [&_.rdp-day]:border-[#242424] [&_.rdp-day]:m-0 [&_.rdp-day]:rounded-none [&_.rdp-day]:h-[91.2px] [&_.rdp-day]:aspect-auto [&_.rdp-day]:justify-start [&_.rdp-day]:items-start [&_.rdp-week]:mt-0 [&_.rdp-weekdays]:text-[7.58px] [&_.rdp-weekday]:border-y-[0.47px] [&_.rdp-weekday]:border-r-[0.47px] [&_.rdp-weekday]:rounded-none [&_.rdp-weekday]:border-[#242424] [&_.rdp-weekday]:first:border-l-[0.47px] [&_.rdp-weekday]:"
                classNames={{
                  caption_label: 'text-white font-semibold'
                }}
                formatters={{
                  formatWeekdayName: (date) =>
                    date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(), 
                }}
                components={{
                  PreviousMonthButton: props => <button {...props} style={{ marginLeft: '3rem' }}><RightArrow className="rotate-180 size-6" /></button>,
                  NextMonthButton: props => <button {...props} style={{ marginRight: '3rem' }}><RightArrow className="size-6" /></button>,
                }}
              />
            </div>
          </div>
          <button><Message /></button>
          <button className="size-10 bg-white rounded-full font-medium text-[23px]">{name.split(' ')[1][0]}</button>
        </div>
      </header>
      <nav className="h-[67px] border-b border-gray-100 text-deep-gray overflow-x-auto">
        <div className="max-w-7xls mx-auto flex justify-between items-center h-full">
          <ul className="flex gap-[21px] text-sm">
            {
              Object.keys(links).map((name) => (
                <li>
                  <a 
                    href={`/${name}`}
                    data-is-active={location.pathname === `/${name}` || (name === 'dashboard' && location.pathname === '/')} 
                    className="flex gap-2 items-center justify-center h-[38px] w-[170px] hover:bg-gray data-[is-active=true]:bg-gray rounded-lg data-[is-active=true]:font-semibold capitalize"
                  >
                    {links[name as Links]()}
                    {name}
                  </a>
                </li>
              ))
            }
          </ul>
          <fieldset className="flex items-center pl-4 pr-3 border border-light-gray bg-gray rounded-xl gap-2 w-[319px] h-[43px] ">
            <Search />
            <input type="search" placeholder="Search listings, users here..." className="outline-none text-xs font-light placeholder:text-semi-gray w-full" />
          </fieldset>
        </div>
      </nav>
      <div className="max-w-7xls mx-auto gap-5">
        <div className="text-black">
          <h2 className="font-semibold text-xl pt-3 pb-4">Welcome, {name.split(' ')[0]}</h2>
          <div className="flex flex-col md:flex-row gap-5">
            <section className="pt-4 pb-[18px] border border-light-gray rounded-2xl flex-[2.15]">
              <div className="px-[22px]">
                <div className="flex items-center justify-between">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-xl">Sales Overview</h3>
                    <p className="text-xs text-mid-gray">Showing overview Jan 2022 - Sep 2022</p>
                  </div>
                  <a href="/transactions" className="h-[46px] px-[37px] rounded-full border border-gray-300 flex items-center font-medium text-xs text-nowrap">View Transactions</a>
                </div>
                <div className="mt-[15px] ml-auto w-fit text-deep-gray text-sm flex gap-3">
                  {
                    ['week', 'month', 'year'].map(t => <FilterButton name={t} />)
                  }
                </div>
              </div>
              <div className="border-t border-light-gray mt-3 pt-4 flex flex-col lg:flex-row px-[22px] gap-9">
                <div className="flex-1 relative">
                  <button disabled={true} className="bg-light-gray size-[18px] flex items-center justify-center absolute rounded-full -left-5 top-1/2 -translate-y-1/2 disabled:opacity-[.38] disabled:pointer-events-none z-[1]"><RightArrow className="rotate-180" /></button>
                  <Chart />
                  <button disabled={false} className="bg-light-gray size-[18px] flex items-center justify-center absolute rounded-full -right-6 top-1/2 -translate-y-1/2 disabled:opacity-[.38] disabled:pointer-events-none z-[1]"><RightArrow /></button>
                  <div className="h-[150px] w-8 shadow-custom absolute -right-6 top-1/2 -translate-y-1/2"></div>
                </div>
                <ul className="flex-1 grid grid-cols-2 gap-y-3.5 gap-x-4">
                  {
                    data.map(d => (
                      <Stats {...d} />
                    ))
                  }
                </ul>
              </div>
            </section>
            <section className="flex-1 flex flex-col gap-5">
              {
                cards.map(card => (
                  <Card {...card} />
                ))
              }
            </section>
          </div>
        </div>
        <section className="mt-5 flex *:flex-1 flex-col sm:flex-row gap-[15px]">
          <Carousel name="most-clicked" data={Array(2).fill("Urban Prime Plaza Premiere")} />
          <Carousel name="most-watchlisted" data={Array(5).fill("Urban Prime Plaza Premiere")} />
          <Carousel name="hottest-listing" data={Array(5).fill("Urban Prime Plaza Premiere")} />
        </section>
        <button className="bg-[#242526] size-[57.6px] flex items-center justify-center rounded-full fixed border border-[#FFFFFF33] right-[70.2px] bottom-[212.2px]">
          <MessagesBold />
        </button>
      </div>
    </>
  )
}

const Stats: FC<IData> = ({ price, name, rate, color }) => 
  <div className="px-[15px] rounded-xl border border-light-gray space-y-2 h-[73px] flex flex-col justify-center">
    <p style={{ color }} className="font-semibold text-[19px]">₦{price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
    <div className="flex gap-3 items-center text-[10px]">
      <p className="text-deep-gray font-medium">{name}</p>
      <p style={{ color: rate >= 1 ? '#12B76A' : '#F04438' }} className="flex items-center gap-2">
        <ArrowUp className={rate < 1 ? 'rotate-180' : ''} />
        {rate}%
      </p>
    </div>
  </div>;

const Card: FC<ICard> = ({ name, icon, data }) => 
  <div className="border border-light-gray rounded-2xl overflow-hidden">
    <div className="bg-hc border-b border-light-gray h-[50px] flex items-center justify-between font-medium px-4">
      <h3 className="flex gap-2.5 text-gray-800 items-center text-sm capitalize">
        {icon()}
        {name} Overview
      </h3>
      <a 
        href={`/${name}`} 
        className="text-[#4545FE] flex items-center gap-0.5 text-xs"
      >
        View all<AngleRight />
      </a>
    </div>
    <ul className="mt-5 px-4 pb-4 flex justify-between">
      {
        data.map(({ name, count }) => (
          <li className="space-y-2">
            <h4 className="font-medium text-sm leading-5 text-gray-600 capitalize">{name}</h4>
            <p className="font-semibold text-2xl leading-[38px] lowercase">
              {new Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short' }).format(count)}
            </p>
          </li>
        ))
      }
    </ul>
  </div>;

const Carousel: FC<{name: string, data: string[]}> = ({ name, data }) => {
  const [slide, setSlide] = useState(0);

  return (
    <div className="max-h-[286px] h-[286px] rounded-xl relative overflow-hidden">
      <img src={`/${name}-${slide + 1}.jpg`} alt={name} className="size-full object-cover" />
      <div className="absolute carousel-gradient text-white top-0 left-0 size-full flex flex-col justify-end p-4">
        <h2 className="text-sm font-medium uppercase">{name.split('-').join(' ')}</h2>
        <p className="text-lg font-semibold">{data[slide]}</p>
      </div>
      <div className="absolute bottom-[8.8px] -translate-x-1/2 left-1/2 flex gap-2">
        {
          Array(data.length).fill(' ').map((_, i) => (
            <button onClick={() => setSlide(i)} data-is-active={slide === i} className="bg-white size-[6.63px] rounded-full data-[is-active=true]:border-[1.1px] border-gray-200 opacity-20 data-[is-active=true]:opacity-100"></button>
          ))
        }
      </div>
    </div>
  )
};

const Modal: FC<{ isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>}> = ({ isOpen, setIsOpen }) => (
  <div hidden={!isOpen} onClick={() => setIsOpen(false)} className="fixed z-[2] size-full left-0 top-0 bg-[#00000080]">
    <div onClick={e => e.stopPropagation()} className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-white max-w-[438px] h-[80vh] max-h-[559px] w-full rounded-[10px] overflow-hidden">
      <div className="h-[213px] bg-[#0C2841] border-b border-gray-200 relative">
        <img src='/modal-overlay.png' alt="modal overlay" className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-[10px]" />
        <div className="z-[1] absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"><Calc /></div>
      </div>
      <ul className="max-w-[344px] mx-auto py-4 space-y-[23px]">
        <li className="gap-3 flex items-center">
          <div><Settings /></div>
          <div className="space-y-1">
            <h3 className="font-semibold text-black">Set up annual budgets by account category</h3>
            <p className="text-xs text-mid-gray">Allocate funds across income and expense lines with full visibility.</p>
          </div>
        </li>
        <li className="gap-3 flex items-center">
          <div><TrendUp /></div>
          <div className="space-y-1">
            <h3 className="font-semibold text-black">Track actuals vs budget in real time</h3>
            <p className="text-xs text-mid-gray">See how your community is performing against plan, month by month.</p>
          </div>
        </li>
        <li className="gap-3 flex items-center">
          <div><AlignBottom /></div>
          <div className="space-y-1">
            <h3 className="font-semibold text-black">Adjust figures and forecast with ease</h3>
            <p className="text-xs text-mid-gray">Edit amounts, apply percentage changes, or roll forward last year’s data—all in one place.</p>
          </div>
        </li>
      </ul>
      <button className="mb-4 max-w-[344px] font-medium h-[46px] bg-gray-900 text-white rounded-full w-full block mx-auto ">Create budget</button>
    </div>
  </div>
);

const Chart = () => {
  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: '#919191',
          font: { size: 10, weight: 500 }
        }
      },
      y: {
        beginAtZero: true,
        grid: { display: false },
        ticks: {
          color: '#919191',
          font: { size: 10 },
          callback: function (v) {
            return v + "m";
          },
        },
        suggestedMax: 50,
      },
    },
  };

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    datasets: [
      {
        label: "Dataset 1",
        backgroundColor: "#4545FE",
        data: [35, 5, 15, 16, 10, 36, 23, 23, 36],
        barPercentage: 0.6,
        categoryPercentage: 0.5,
      },
      {
        label: "Dataset 2",
        backgroundColor: "#12B76A",
        data: [28, 28, 25, 26, 2, 48, 35, 10, 32],
        barPercentage: 0.6,
        categoryPercentage: 0.5,
      },
      {
        label: "Dataset 3",
        backgroundColor: "#F04438",
        data: [10, 10, 3, 10, 8, 8, 18, 18, 7],
        barPercentage: 0.6,
        categoryPercentage: 0.5,
      },
    ],
  };

  return (
    <Bar options={options} data={data} />
  )
}

export default App
