import { Stack } from 'expo-router/stack';
import { SQLiteDatabase, SQLiteProvider } from 'expo-sqlite';
import { Suspense } from 'react';
import { Text, View } from 'react-native';
import * as SystemUI from 'expo-system-ui';

SystemUI.setBackgroundColorAsync("black");

export default function Layout() {
    return <Suspense fallback={<Text>Loading</Text>}>
        <SQLiteProvider databaseName='friends' onInit={migrateDbIfNeeded}>
            <Stack screenOptions={{
                    contentStyle: {padding: 20, backgroundColor: "#0d0d0d"}, 
                    headerStyle: {backgroundColor: "#5522ff"},
                    headerTintColor: "white"
                }}>
                <Stack.Screen name="index" options={{ headerTitle: "Freunde" }} />
                <Stack.Screen name="[id]" />
            </Stack>
        </SQLiteProvider>
    </Suspense>;
}

async function migrateDbIfNeeded(db: SQLiteDatabase) {
    await db.execAsync(`
        PRAGMA foreign_keys = ON;
        CREATE TABLE IF NOT EXISTS friends (
            id INTEGER PRIMARY KEY NOT NULL,
            name VARCHAR(64) NOT NULL UNIQUE
        );
        CREATE TABLE IF NOT EXISTS attributes (
            id INTEGER PRIMARY KEY NOT NULL,
            name VARCHAR(64) NOT NULL UNIQUE
        );
        CREATE TABLE IF NOT EXISTS friend_attributes (
            id INTEGER PRIMARY KEY NOT NULL,
            friend_id INTEGER NOT NULL,
            attribute_id INTEGER NOT NULL,
            value VARCHAR NOT NULL,
            FOREIGN KEY(friend_id) REFERENCES friends(id) ON DELETE CASCADE,
            FOREIGN KEY(attribute_id) REFERENCES attributes(id) ON DELETE CASCADE
        );
    `)
}