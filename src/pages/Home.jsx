import styles from './Home.module.css'

export default function Home() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Welcome to Space Travel</h1>
            <div className={styles.mainContainer}>
                <p>Here you can explore the universe with our advanced spacecrafts!</p>
                <p>Build your own spacecraft and embark on interstellar adventures as well as exploring planets and Spaceships across the galaxy!</p>
                <p>Feel free to explore the navigation bar to access different sections of the site.</p>
            </div>
        </div>
    );
}