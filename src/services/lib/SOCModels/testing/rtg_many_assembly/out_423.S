.text

#A function power in RISC-V that takes in two numbers x and n, and returns x^n 

Power:
		add     x14 , x0 , x0 	#i
		addi    x4 , x0 , 1 	#Result
		addi    x7 , x0 , 9 	#x
		addi    x1 , x0 , 1 	#n
Loop:
		bge     x14 , x1 , Result 
		slli    x14 , x14 , 3 
		addi    x14 , x14 , 1 
		jal     x0 , Loop
Result:
		addi    x6 , x0 , 9 
		bne     x14 , x6 , Fail 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
