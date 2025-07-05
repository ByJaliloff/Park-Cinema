import React, { useContext, useState } from 'react';
import { MovieContext } from '../context/DataContext';
import { Link } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const LANGUAGES = ['AZ', 'TR', 'RU', 'EN'];
const TABS = ['Hamısı', 'Tezliklə', 'Cədvəl'];

function Filter() {
  const {
    theatres,
    selectedTheatre,
    setSelectedTheatre,
    selectedLanguage,
    setSelectedLanguage,
  } = useContext(MovieContext);

  const [activeView, setActiveView] = useState('Siyahı');
  const [activeTab, setActiveTab] = useState('Hamısı');
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const uniqueTheatres = [
    ...new Map(theatres.map(theatre => [theatre.theatreTitle, theatre])).values()
  ];

  const handleClearFilters = () => {
    setSelectedLanguage('');
    setSelectedTheatre('');
    setSelectedDate(dayjs());
  };

  const isFilterActive =
    !!selectedLanguage ||
    !!selectedTheatre ||
    (selectedDate && !selectedDate.isSame(dayjs(), 'day'));

  const isClearable = isFilterActive && activeTab === 'Hamısı';

  const filteredTheatres = theatres.filter(theatre =>
    (!selectedLanguage || theatre.language === selectedLanguage) &&
    (!selectedTheatre || theatre.id === selectedTheatre) &&
    (selectedDate ? dayjs(theatre.date).isSame(selectedDate, 'day') : true)
  );



  return (
    <div className="text-white px-6 py-6 space-y-6">
      <div className="flex justify-evenly items-center text-[30px] font-semibold">
        <button
          onClick={() => setActiveView('Siyahı')}
          className={`transition-all ${activeView === 'Siyahı' ? 'text-white drop-shadow-glow' : 'text-gray-400'}`}
        >
          Siyahı
        </button>
        <Link
          to="/treyler"
          onClick={() => setActiveView('Treyler')}
          className={`transition-all ${activeView === 'Treyler' ? 'text-white drop-shadow-glow' : 'text-gray-400'}`}
        >
          Treylerlər
        </Link>
      </div>

      {activeView === 'Siyahı' && (
        <div className="flex items-center justify-between">
          <div className="flex gap-6 pb-2 text-[20px]">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${activeTab === tab ? 'underline underline-offset-4' : 'text-gray-400'} transition-all`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      )}

      {activeView === 'Siyahı' && activeTab === 'Hamısı' && (
        <div className="flex items-end justify-between gap-4 text-sm mt-2">
          <div className="flex justify-center gap-4 w-full text-[16px]">

            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-transparent border-b border-white pb-2 focus:outline-none text-white italic w-[30%] text-center text-[16px] font-medium"
            >
              <option value="" disabled hidden>Dil</option>
              <option disabled className="text-black text-left" style={{ backgroundColor: '#8e8e91' }}>Dil</option>
              {LANGUAGES.map(lang => (
                <option key={lang} value={lang} className="text-black text-left" style={{ backgroundColor: '#8e8e91' }}>
                  {lang}
                </option>
              ))}
            </select>

            <select
              value={selectedTheatre}
              onChange={(e) => setSelectedTheatre(e.target.value)}
              className="bg-transparent border-b border-white pb-2 focus:outline-none text-white italic w-[30%] text-center text-[16px] font-medium"
            >
              <option value="" disabled hidden>Kinoteatr</option>
              <option disabled className="text-black text-left" style={{ backgroundColor: '#8e8e91' }}>Kinoteatr</option>
              {uniqueTheatres.map(theatre => (
                <option key={theatre.id} value={theatre.id} className="text-black text-left" style={{ backgroundColor: '#8e8e91' }}>
                  {theatre.theatreTitle}
                </option>
              ))}
            </select>

            <div className="w-[30%] border-b border-white text-center">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  format="DD.MM.YYYY"
                  enableAccessibleFieldDOMStructure={false}
                  slotProps={{
                    textField: {
                      variant: 'standard',
                      InputProps: {
                        disableUnderline: true,
                        readOnly: true,
                        sx: {
                          '& .MuiSvgIcon-root': {
                            color: 'white',  
                          },
                        },
                      },
                      inputProps: {
                        style: {
                          textAlign: 'center',
                          fontSize: '16px',
                          fontStyle: selectedDate.isSame(dayjs(), 'day') ? 'italic' : 'normal',
                          color: 'white',
                          backgroundColor: 'transparent',
                        },
                        value: selectedDate.isSame(dayjs(), 'day')
                          ? 'Bugün'
                          : selectedDate.format('DD.MM.YYYY'),
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </div>
          </div>
          {isClearable && (
            <button
              onClick={handleClearFilters}
              className="text-[16px] border border-[#ef4444] px-3 py-4 text-[#ef4444] hover:text-white hover:bg-[#ef4444] whitespace-nowrap ml-4"
            >
              Təmizlə
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Filter;
