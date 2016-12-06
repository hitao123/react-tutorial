import counter from './index'
//单元测试
describe('reducer',() => {
	describe('counter',() => {
		it('should provide the initial state',() => {
			expect(counter(undefined,{})).toBe(0);
		})
		it('should increment the state',() => {
			expect(counter(1,{type: 'INCREMENT'})).toBe(2);
		})
		it('should decrement the state',() => {
			expect(counter(2,{type: 'DECREMENT'})).toBe(1);
		})
		it('should ignore unknown actions', () => {
		  expect(counter(1, { type: 'unknown' })).toBe(1)
		})
	})
})