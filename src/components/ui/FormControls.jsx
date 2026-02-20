import React from 'react';

const Input = ({ label, name, type = "text", value, onChange, placeholder, ...props }) => (
  <div className="input-group">
    {label && <label htmlFor={name}>{label}</label>}
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="input-field"
      {...props}
    />
  </div>
);

const Checkbox = ({ label, name, checked, onChange }) => (
  <label className="flex items-center space-x-2 cursor-pointer py-1">
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      className="accent-[#850018]"
    />
    <span className="text-sm">{label}</span>
  </label>
);

const RadioGroup = ({ label, name, options, value, onChange }) => (
  <div className="mb-4">
    <p className="text-sm font-medium mb-2">{label}</p>
    <div className="flex space-x-4">
      {options.map((opt) => (
        <label key={opt.value} className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={onChange}
            className="accent-[#850018]"
          />
          <span className="text-sm">{opt.label}</span>
        </label>
      ))}
    </div>
  </div>
);

export { Input, Checkbox, RadioGroup };
