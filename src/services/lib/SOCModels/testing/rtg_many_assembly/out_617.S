.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x22 , x0 , 4 
		add     x4 , x0 , x0 
		add     x31 , x0 , x0 
		addi    x13 , x0 , 20 
InArr:
		addi    x2 , x0 , 176 
		addi    x23 , x0 , 4 
		addi    x12 , x0 , 12 
		addi    x24 , x0 , 16 
		sw      x2 , 28 (x13) 
		sw      x23 , 32 (x13) 
		sw      x12 , 36 (x13) 
		sw      x24 , 40 (x13) 
Loop:
		slli    x20 , x31 , 2 
		add     x21 , x20 , x13 
		lw      x29 , 28 (x21) 
		add     x4 , x4 , x29 
		addi    x31 , x31 , 1 
		beq     x31 , x22 , Result 
		jal     x0 , Loop
Result:
		addi    x5 , x0 , 208 
		bne     x5 , x4 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
