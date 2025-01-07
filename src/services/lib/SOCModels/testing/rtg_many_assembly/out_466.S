.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x22 , x0 , 4 
		add     x19 , x0 , x0 
		add     x12 , x0 , x0 
		addi    x1 , x0 , 8 
		addi    x23 , x0 , 2 
InArr:
		addi    x7 , x0 , 52 
		addi    x6 , x0 , 64 
		addi    x13 , x0 , 20 
		addi    x26 , x0 , 72 
		sb      x7 , 76 (x1) 
		sb      x6 , 80 (x1) 
		sb      x13 , 84 (x1) 
		sb      x26 , 88 (x1) 
Loop:
		sll     x28 , x12 , x23 
		add     x3 , x28 , x1 
		lbu     x24 , 76 (x3) 
		add     x19 , x19 , x24 
		addi    x12 , x12 , 1 
		beq     x12 , x22 , Result 
		jal     x0 , Loop 
Result:
		addi    x2 , x0 , 208 
		bne     x2 , x19 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
