import { getPreset, loadValues, saveValues } from "./Storage";

describe('Storage', () => {
  it('getPreset', () => {
    const preset = getPreset();
    
    expect(Object.values(preset).length).toBeGreaterThan(0);
  });
  
  it('loadValues', () => {
    Storage.prototype.getItem = jest.fn(() => '{"colors.primary":{"value":"#000000","type":"color"},"colors.primaryBackground":{"value":"#ffffff","type":"color"}}')
    const storedValues = loadValues();
    
    expect(Object.values(storedValues)).toHaveLength(2);
  });

  it('loadValues should fallback', () => {
    Storage.prototype.getItem = jest.fn(() => null)
    const storedValues = loadValues();
    
    expect(Object.values(storedValues)).toHaveLength(0);
  });

  it('saveValues', () => {
    const values = {
      "colors.primary":{"value":"#000000","type":"color"},
      "colors.primaryBackground":{"value":"#ffffff","type":"color"}
    };
    Storage.prototype.setItem = jest.fn(() => {});
    saveValues(values);
    
    expect(Storage.prototype.setItem.mock.calls.length).toBe(1);
    expect(Storage.prototype.setItem.mock.calls[0][1]).toStrictEqual(JSON.stringify(values));
  });
});
