<template>
    <div class="toast-wrapper">
        <div class="toast">
            Status message goes here...
        </div>
    </div>
</template>

<style>

.toast-wrapper {
    position: fixed;
    width: 100%;
    top: 20px;
}

.toast{
    padding: 20px;
    color: white;
    background: red;
    border-radius: 8px;
    box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    margin: 0 auto;
}

</style>
