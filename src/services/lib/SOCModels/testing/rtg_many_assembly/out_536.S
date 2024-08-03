.text

#The program checks the ALU instruction in I_type

Main:
		addi    x29 , x0 , 9 
		addi    x8 , x0 , -2048 
		slti    x20 , x29 , 147 
		bltu    x29 , x8 , Less_i 
		bgeu    x29 , x8 , Bigger_i 
Less_i:
		ori     x25 , x29 , 27 
		sub     x31 , x8 , x29 
		srai    x31 , x31 , 3 
		and     x31 , x31 , x0 
		addi    x4 , x0 , 0 
		beq     x31 , x4 , Pass 
Bigger_i:
		ori     x25 , x29 , 132 
		sub     x31 , x8 , x29 
		srai    x31 , x31 , 3 
		and     x31 , x31 , x0 
		addi    x4 , x0 , 0 
		beq     x31 , x4 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
