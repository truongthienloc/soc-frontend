.text

#A function power in RISC-V that takes in two numbers x and n, and returns x^n 

Power:
		add     x30 , x0 , x0 	#i
		addi    x5 , x0 , 1 	#Result
		addi    x21 , x0 , 0 	#x
		addi    x26 , x0 , 2 	#n
Loop:
		bge     x30 , x26 , Result 
		slli    x30 , x30 , 3 
		addi    x30 , x30 , 1 
		jal     x0 , Loop
Result:
		addi    x18 , x0 , 0 
		bne     x30 , x18 , Fail 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
