.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x1 , x0 , 4 
		add     x21 , x0 , x0 
		add     x23 , x0 , x0 
		addi    x29 , x0 , 52 
		addi    x8 , x0 , 2 
InArr:
		addi    x19 , x0 , 16 
		addi    x7 , x0 , 16 
		addi    x16 , x0 , 68 
		addi    x26 , x0 , 16 
		sh      x19 , 48 (x29) 
		sh      x7 , 52 (x29) 
		sh      x16 , 56 (x29) 
		sh      x26 , 60 (x29) 
Loop:
		sll     x20 , x23 , x8 
		add     x30 , x20 , x29 
		lhu     x28 , 48 (x30) 
		add     x21 , x21 , x28 
		addi    x23 , x23 , 1 
		beq     x23 , x1 , Result 
		jal     x0 , Loop 
Result:
		addi    x18 , x0 , 116 
		bne     x18 , x21 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
