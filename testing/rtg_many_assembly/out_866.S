.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x18 , x0 , 4 
		add     x30 , x0 , x0 
		add     x17 , x0 , x0 
		addi    x8 , x0 , 68 
		addi    x5 , x0 , 2 
InArr:
		addi    x20 , x0 , 16 
		addi    x23 , x0 , 56 
		addi    x12 , x0 , 44 
		addi    x7 , x0 , 4 
		sb      x20 , 44 (x8) 
		sb      x23 , 48 (x8) 
		sb      x12 , 52 (x8) 
		sb      x7 , 56 (x8) 
Loop:
		sll     x3 , x17 , x5 
		add     x31 , x3 , x8 
		lbu     x27 , 44 (x31) 
		add     x30 , x30 , x27 
		addi    x17 , x17 , 1 
		beq     x17 , x18 , Result 
		jal     x0 , Loop 
Result:
		addi    x21 , x0 , 120 
		bne     x21 , x30 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
