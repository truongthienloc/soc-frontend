.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x24 , x0 , 4 
		add     x23 , x0 , x0 
		add     x19 , x0 , x0 
		addi    x17 , x0 , 40 
		addi    x3 , x0 , 2 
InArr:
		addi    x30 , x0 , 60 
		addi    x11 , x0 , 44 
		addi    x5 , x0 , 12 
		addi    x14 , x0 , 12 
		sb      x30 , 40 (x17) 
		sb      x11 , 44 (x17) 
		sb      x5 , 48 (x17) 
		sb      x14 , 52 (x17) 
Loop:
		sll     x20 , x19 , x3 
		add     x4 , x20 , x17 
		lbu     x7 , 40 (x4) 
		add     x23 , x23 , x7 
		addi    x19 , x19 , 1 
		beq     x19 , x24 , Result 
		jal     x0 , Loop 
Result:
		addi    x27 , x0 , 128 
		bne     x27 , x23 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
