define(['Application/_Config/Config'], (module) => {
   const Config = module.default;
   const stringValue = 'StringValue';
   const numValue = 42;
   const boolValue = true;
   const cfg = {
      'KeyStr': stringValue,
      'KeyNum': numValue,
      'KeyBool': boolValue,
   };
   const config = new Config(cfg);
   describe('Config', () => {
      describe('get', () => {
         it('string value', () => {
            assert.strictEqual(stringValue, config.get('KeyStr'), 'String value is broken');
         });
         it('number value', () => {
            assert.strictEqual(numValue, config.get('KeyNum'), 'Number value is broken');
         });
         it('boolean value', () => {
            assert.strictEqual(boolValue, config.get('KeyBool'), 'Boolean value is broken');
         });
         it('getState()', () => {
            assert.strictEqual(cfg, config.getState(), 'State is broken');
         });
      });
   });
});