.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x30 , x0 , 4 
		add     x18 , x0 , x0 
		add     x25 , x0 , x0 
		addi    x8 , x0 , 36 
InArr:
		addi    x29 , x0 , 152 
		addi    x24 , x0 , 20 
		addi    x11 , x0 , 28 
		addi    x17 , x0 , 56 
		sw      x29 , 12 (x8) 
		sw      x24 , 16 (x8) 
		sw      x11 , 20 (x8) 
		sw      x17 , 24 (x8) 
Loop:
		slli    x6 , x25 , 2 
		add     x20 , x6 , x8 
		lw      x15 , 12 (x20) 
		add     x18 , x18 , x15 
		addi    x25 , x25 , 1 
		beq     x25 , x30 , Result 
		jal     x0 , Loop
Result:
		addi    x4 , x0 , 256 
		bne     x4 , x18 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
