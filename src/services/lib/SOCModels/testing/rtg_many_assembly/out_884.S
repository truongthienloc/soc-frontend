.text

#The program checks the ALU instruction in I_type

Main:
		addi    x9 , x0 , 141 
		addi    x31 , x0 , 111 
		sltiu   x1 , x9 , 111 
		bltu    x9 , x31 , Less_i 
		bgeu    x9 , x31 , Bigger_i 
Less_i:
		ori     x8 , x9 , 37 
		sub     x10 , x31 , x9 
		srai    x10 , x10 , 0 
		and     x10 , x10 , x0 
		addi    x29 , x0 , 0 
		beq     x10 , x29 , Pass 
Bigger_i:
		ori     x8 , x9 , 103 
		sub     x10 , x31 , x9 
		srai    x10 , x10 , 0 
		and     x10 , x10 , x0 
		addi    x29 , x0 , 0 
		beq     x10 , x29 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
