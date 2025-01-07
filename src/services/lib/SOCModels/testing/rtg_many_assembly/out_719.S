.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x13 , x0 , 4 
		add     x6 , x0 , x0 
		add     x7 , x0 , x0 
		addi    x14 , x0 , 20 
		addi    x3 , x0 , 2 
InArr:
		addi    x2 , x0 , 28 
		addi    x30 , x0 , 52 
		addi    x21 , x0 , 32 
		addi    x16 , x0 , 56 
		sb      x2 , 0 (x14) 
		sb      x30 , 4 (x14) 
		sb      x21 , 8 (x14) 
		sb      x16 , 12 (x14) 
Loop:
		sll     x8 , x7 , x3 
		add     x26 , x8 , x14 
		lbu     x9 , 0 (x26) 
		add     x6 , x6 , x9 
		addi    x7 , x7 , 1 
		beq     x7 , x13 , Result 
		jal     x0 , Loop 
Result:
		addi    x24 , x0 , 168 
		bne     x24 , x6 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
