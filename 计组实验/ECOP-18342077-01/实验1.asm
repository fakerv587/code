.text
.globl main
main:
    la $a0, m1 #将m1的地址赋值给a0
    li $v0, 4 #输出m1，提示用户输入数组长度
    syscall

    li $v0, 5 #读入数组大小
    syscall

    la $t6, array #将数组array的地址赋值给t6
    move $t7, $zero #t7初始化为0
    move $t8, $v0 #t8初始化为v0（数组长度）
    move $t9, $zero #t9初始化为0
    la $a0, m2 #将m2的地址赋值给a0
    li $v0, 4 #输出m2，提示用户输入数组成员
    syscall
input:#读入
    li $v0,5 #读入数组成员
    syscall

    move $t0, $t7 #将t0赋值为t7
    mul $t0, $t0, 4 #t0*4
    addu $t1, $t0, $t6 #t1=t0+t6
    sw $v0, 0($t1) #将t1的地址存储到v0

    addi $t7, $t7, 1 #t7=t7+1
    blt $t7, $t8, input #假如数组没有读满 则跳转到开头
    move $t7, $zero #t7重新赋值为0

    #开始排序
loop1:#循环1
    move $t9, $zero #t9初始化为0

loop2:#循环2
    move $t0, $t9 #t0赋值为t9
    mul $t0, $t0, 4 #t0*4
    addu $t1, $t0, $t6 #t1=t0+t6
    lw $t2, 0($t1) #将t1地址中的数赋值到t2

    addi $t0, $t9, 1  #t0=t9+1
    mul $t0, $t0, 4 #t0*4
    addu $t4, $t0, $t6 #t4=t0+t6
    lw $t3, 0($t4) #将t4地址中的数赋值到t3

    bge $t2, $t3, skip#假如t2>=t3,就跳到skip，否则交换
    sw $t3, 0($t1)
    sw $t2, 0($t4)

skip:
   addi $t9, $t9, 1 #t9=t9+1
   addi $t0, $t9, 1 #t0=t9+1
   sub $t1, $t8, $t7 #t1=t8-t7
   blt $t0, $t1, loop2 #假如没有进行到数组尾，即没有冒泡到最后一个，就继续进行循环2
   addi $t7, $t7, 1 #t7=t7+1
   sub $t2, $t8, 1 #t2=t8-1
   blt $t7, $t2, loop1 #假如还可以从头开始冒泡，就继续冒泡

output:
   la $a0, m #将m赋值到a0
   li $v0, 4 #提示用户下面是排完序后数组
   syscall

   move $t7, $zero #t7=0

print:#输出
   move $t0, $t7 #t0=t7
   mul $t0, $t0, 4 #t0*4
   addu $t1, $t0, $t6 #t1=t0+t6
   lw $a0, 0($t1) #将t1地址中的数赋值给a0，用来输出t1中的数
   li $v0, 1 #调整为输出整数
   syscall #输出

   la $a0, seperate #输出分隔符
   li $v0, 4
   syscall

   addi $t7, $t7, 1 #指针向后移一位，输出后一个数
   blt $t7, $t8, print #假如数组没有输出完，则继续输出


.data
array:.space 1024
m1:.asciiz "Please enter the array size:\n"#用不了中文，只好用英文了
m2:.asciiz "Please enter the number to sort:\n"
m:.asciiz "The sorted array is as follows:\n"
seperate:.asciiz " "