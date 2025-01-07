.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x21 , x0 , 4 
		add     x5 , x0 , x0 
		add     x31 , x0 , x0 
		addi    x19 , x0 , 48 
		addi    x12 , x0 , 2 
InArr:
		addi    x4 , x0 , 64 
		addi    x15 , x0 , 68 
		addi    x11 , x0 , 44 
		addi    x22 , x0 , 4 
		sb      x4 , 12 (x19) 
		sb      x15 , 16 (x19) 
		sb      x11 , 20 (x19) 
		sb      x22 , 24 (x19) 
Loop:
		sll     x1 , x31 , x12 
		add     x27 , x1 , x19 
		lbu     x24 , 12 (x27) 
		add     x5 , x5 , x24 
		addi    x31 , x31 , 1 
		beq     x31 , x21 , Result 
		jal     x0 , Loop 
Result:
		addi    x23 , x0 , 180 
		bne     x23 , x5 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
