.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x14 , x0 , 4 
		add     x7 , x0 , x0 
		add     x13 , x0 , x0 
		addi    x10 , x0 , 44 
InArr:
		addi    x5 , x0 , 156 
		addi    x12 , x0 , 4 
		addi    x15 , x0 , 76 
		addi    x1 , x0 , 24 
		sw      x5 , 48 (x10) 
		sw      x12 , 52 (x10) 
		sw      x15 , 56 (x10) 
		sw      x1 , 60 (x10) 
Loop:
		slli    x17 , x13 , 2 
		add     x28 , x17 , x10 
		lw      x6 , 48 (x28) 
		add     x7 , x7 , x6 
		addi    x13 , x13 , 1 
		beq     x13 , x14 , Result 
		jal     x0 , Loop
Result:
		addi    x24 , x0 , 260 
		bne     x24 , x7 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
