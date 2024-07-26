.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x24 , x0 , 4 
		add     x30 , x0 , x0 
		add     x1 , x0 , x0 
		addi    x13 , x0 , 24 
InArr:
		addi    x28 , x0 , 40 
		addi    x3 , x0 , 12 
		addi    x16 , x0 , 0 
		addi    x7 , x0 , 44 
		sw      x28 , 4 (x13) 
		sw      x3 , 8 (x13) 
		sw      x16 , 12 (x13) 
		sw      x7 , 16 (x13) 
Loop:
		slli    x19 , x1 , 2 
		add     x5 , x19 , x13 
		lw      x18 , 4 (x5) 
		add     x30 , x30 , x18 
		addi    x1 , x1 , 1 
		beq     x1 , x24 , Result 
		jal     x0 , Loop
Result:
		addi    x10 , x0 , 96 
		bne     x10 , x30 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
