.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x23 , x0 , 4 
		add     x31 , x0 , x0 
		add     x10 , x0 , x0 
		addi    x3 , x0 , 68 
InArr:
		addi    x26 , x0 , 56 
		addi    x21 , x0 , 76 
		addi    x22 , x0 , 12 
		addi    x15 , x0 , 20 
		sw      x26 , 96 (x3) 
		sw      x21 , 100 (x3) 
		sw      x22 , 104 (x3) 
		sw      x15 , 108 (x3) 
Loop:
		slli    x29 , x10 , 2 
		add     x2 , x29 , x3 
		lw      x7 , 96 (x2) 
		add     x31 , x31 , x7 
		addi    x10 , x10 , 1 
		beq     x10 , x23 , Result 
		jal     x0 , Loop
Result:
		addi    x20 , x0 , 164 
		bne     x20 , x31 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
