.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x22 , x0 , 4 
		add     x29 , x0 , x0 
		add     x9 , x0 , x0 
		addi    x31 , x0 , 32 
		addi    x1 , x0 , 2 
InArr:
		addi    x13 , x0 , 4 
		addi    x30 , x0 , 20 
		addi    x15 , x0 , 8 
		addi    x26 , x0 , 48 
		sb      x13 , 68 (x31) 
		sb      x30 , 72 (x31) 
		sb      x15 , 76 (x31) 
		sb      x26 , 80 (x31) 
Loop:
		sll     x2 , x9 , x1 
		add     x14 , x2 , x31 
		lbu     x23 , 68 (x14) 
		add     x29 , x29 , x23 
		addi    x9 , x9 , 1 
		beq     x9 , x22 , Result 
		jal     x0 , Loop 
Result:
		addi    x20 , x0 , 80 
		bne     x20 , x29 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
