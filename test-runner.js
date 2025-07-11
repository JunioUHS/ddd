const { execSync } = require('child_process');

try {
    // Executa verificação de tipos
    console.log('Checking TypeScript...');
    execSync('npm run tsc -- --noEmit', { stdio: 'inherit' });

    // Se passou, executa jest com os argumentos passados
    const args = process.argv.slice(2).join(' ');
    console.log('TypeScript check passed. Running tests...');
    execSync(`npx jest ${args}`, { stdio: 'inherit' });

} catch (error) {
    console.log('TypeScript check failed. Tests not executed.');
    process.exit(1);
}