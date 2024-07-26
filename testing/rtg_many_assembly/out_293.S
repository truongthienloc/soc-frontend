.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x27 , x0 , 4 
		add     x11 , x0 , x0 
		add     x18 , x0 , x0 
		addi    x13 , x0 , 12 
		addi    x3 , x0 , 2 
InArr:
		addi    x12 , x0 , 4 
		addi    x22 , x0 , 12 
		addi    x31 , x0 , 40 
		addi    x25 , x0 , 36 
		sb      x12 , 76 (x13) 
		sb      x22 , 80 (x13) 
		sb      x31 , 84 (x13) 
		sb      x25 , 88 (x13) 
Loop:
		sll     x29 , x18 , x3 
		add     x4 , x29 , x13 
		lbu     x2 , 76 (x4) 
		add     x11 , x11 , x2 
		addi    x18 , x18 , 1 
		beq     x18 , x27 , Result 
		jal     x0 , Loop 
Result:
		addi    x15 , x0 , 92 
		bne     x15 , x11 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
