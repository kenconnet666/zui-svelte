import ts from 'typescript-eslint';

const original = ts.plugin.rules['no-unused-expressions'];

export default {
  rules: {
    'no-unused-expressions': {
      ...original,
      create(context) {
        const visitors = original.create(context);
        return {
          ...visitors,
          ExpressionStatement(node) {
            let expression = node.expression;
            let depth = 0;
            while (expression.type === 'MemberExpression') {
              depth++;
              expression = expression.object;
            }
            // ICSS 关键字/Token 的属性读取有记录声明的副作用，其余表达式仍按原规则检查。
            if (depth >= 2 && expression.type === 'Identifier' && expression.name === 's') return;
            visitors.ExpressionStatement(node);
          },
        };
      },
    },
  },
};
