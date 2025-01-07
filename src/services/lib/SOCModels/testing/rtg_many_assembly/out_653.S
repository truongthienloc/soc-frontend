.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x23 , x0 , 4 
		add     x29 , x0 , x0 
		add     x7 , x0 , x0 
		addi    x20 , x0 , 64 
		addi    x31 , x0 , 2 
InArr:
		addi    x15 , x0 , 20 
		addi    x1 , x0 , 72 
		addi    x4 , x0 , 60 
		addi    x5 , x0 , 8 
		sb      x15 , 28 (x20) 
		sb      x1 , 32 (x20) 
		sb      x4 , 36 (x20) 
		sb      x5 , 40 (x20) 
Loop:
		sll     x27 , x7 , x31 
		add     x9 , x27 , x20 
		lbu     x3 , 28 (x9) 
		add     x29 , x29 , x3 
		addi    x7 , x7 , 1 
		beq     x7 , x23 , Result 
		jal     x0 , Loop 
Result:
		addi    x8 , x0 , 160 
		bne     x8 , x29 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
