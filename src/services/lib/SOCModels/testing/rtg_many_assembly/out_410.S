.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x30 , x0 , 4 
		add     x26 , x0 , x0 
		add     x16 , x0 , x0 
		addi    x23 , x0 , 60 
		addi    x11 , x0 , 2 
InArr:
		addi    x13 , x0 , 44 
		addi    x9 , x0 , 72 
		addi    x7 , x0 , 52 
		addi    x8 , x0 , 8 
		sh      x13 , 28 (x23) 
		sh      x9 , 32 (x23) 
		sh      x7 , 36 (x23) 
		sh      x8 , 40 (x23) 
Loop:
		sll     x18 , x16 , x11 
		add     x31 , x18 , x23 
		lhu     x6 , 28 (x31) 
		add     x26 , x26 , x6 
		addi    x16 , x16 , 1 
		beq     x16 , x30 , Result 
		jal     x0 , Loop 
Result:
		addi    x14 , x0 , 176 
		bne     x14 , x26 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
