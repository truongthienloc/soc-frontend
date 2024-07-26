.text

#The program checks the ALU instruction in I_type

Main:
		addi    x24 , x0 , 187 
		addi    x11 , x0 , 186 
		sltu    x1 , x24 , x11 
		bltu    x24 , x11 , Less_i 
		bgeu    x24 , x11 , Bigger_i 
Less_i:
		ori     x5 , x24 , 199 
		sub     x6 , x11 , x24 
		srai    x6 , x6 , 1 
		and     x6 , x6 , x0 
		addi    x13 , x0 , 0 
		beq     x6 , x13 , Pass 
Bigger_i:
		ori     x5 , x24 , 91 
		sub     x6 , x11 , x24 
		srai    x6 , x6 , 4 
		and     x6 , x6 , x0 
		addi    x13 , x0 , 0 
		beq     x6 , x13 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
