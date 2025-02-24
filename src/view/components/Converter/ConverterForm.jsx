import React from 'react';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

// SVG-иконка двух горизонтальных стрелок
const SwapIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 7h13M13 3l3.5 4L13 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19 15H6M9 11l-3.5 4L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ConverterForm = ({
  amount = 0,
  setAmount = () => {},
  currencyFrom = null,
  setCurrencyFrom = () => {},
  currencyTo = null,
  setCurrencyTo = () => {},
  currencyList = [],
  onSwap = () => {},
  onConvert = () => {},
  loading = false,
  disabled = false
}) => (
  <form
    className="flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-6 bg-gray-50 dark:bg-gray-800 p-4 md:p-6 pb-[16px] md:pb-[16px] rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300"
    onSubmit={e => {
      e.preventDefault();
      onConvert();
    }}
  >
    <div className="flex flex-col sm:flex-row gap-2 items-start w-full flex-wrap justify-between">
      {/* Инпут суммы */}
      <div className="w-full lg:max-w-[20%] flex-shrink-0 min-w-0 relative mb-2">
        <InputNumber
          value={amount}
          onValueChange={e => setAmount(e.value)}
          mode="decimal"
          min={0}
          placeholder="Сумма"
          className="w-full"
          inputClassName="w-full max-w-full md:text-lg text-base md:h-12 h-10 md:px-3 px-2 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 rounded-lg hover:border-gray-400 dark:hover:border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200"
          required
          disabled={disabled}
        />
      </div>
      {/* Селекты и swap-кнопка */}
      <div className="flex flex-col md:flex-row md:justify-between gap-3 w-full lg:pr-[5px] xl:pr-0 lg:max-w-[57%]">
        <div className="w-full flex-shrink-0 min-w-0 relative mb-2 md:w-[44%]">
          <Dropdown
            value={currencyFrom}
            options={currencyList}
            onChange={e => setCurrencyFrom(e.value)}
            optionLabel="label"
            placeholder="Из"
            className="w-full md:h-12 h-10 md:text-lg text-base flex-shrink-0 min-w-[100%] bg-white dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 rounded-lg hover:border-gray-400 dark:hover:border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 md:px-3 px-2 text-left"
            filter
            showClear
            required
            disabled={disabled}
          />
        </div>
        <div className="md:max-w-12 w-10 min-w-[2.5rem] flex items-center justify-center flex-shrink-0 relative mb-2 mx-auto md:mx-0">
          <Button
            type="button"
            className="swap-btn p-button-rounded p-button-text p-button-secondary bg-gray-200 border-gray-300 text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition md:h-12 md:w-12 h-10 w-10 flex items-center justify-center"
            onClick={onSwap}
            tooltip="Поменять местами"
            tooltipOptions={{ position: 'top' }}
            disabled={disabled}
          >
            <SwapIcon />
          </Button>
        </div>
        <div className="w-full flex-shrink-0 min-w-0 relative mb-2 md:w-[44%]">
          <Dropdown
            value={currencyTo}
            options={currencyList}
            onChange={e => setCurrencyTo(e.value)}
            optionLabel="label"
            placeholder="В"
            className="w-full md:h-12 h-10 md:text-lg text-base flex-shrink-0 min-w-[100%] bg-white dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 rounded-lg hover:border-gray-400 dark:hover:border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 md:px-3 px-2 text-left"
            filter
            showClear
            required
            disabled={disabled}
          />
        </div>
      </div>
      {/* Кнопка "Конвертировать" переносится только на xl и меньше */}
      <div className="w-full lg:max-w-[20%] sm:mt-0 mb-2">
        <Button
          type="submit"
          label="Конвертировать"
          icon="pi pi-refresh"
          className="p-button-primary md:h-12 h-10 md:px-3 px-1 md:text-base text-sm font-semibold rounded-lg shadow-sm bg-blue-100 hover:bg-blue-200 active:bg-blue-300 text-blue-700 dark:bg-gray-600 dark:hover:bg-gray-700 dark:active:bg-gray-800 dark:text-white transition duration-200 w-full"
          loading={loading}
          disabled={loading || disabled}
        />
      </div>
    </div>
  </form>
);

export default ConverterForm;