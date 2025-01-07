.text

#The program checks the ALU instruction in I_type

Main:
		addi    x11 , x0 , -2048 
		addi    x19 , x0 , 132 
		sltu    x7 , x11 , x19 
		bltu    x11 , x19 , Less_i 
		bgeu    x11 , x19 , Bigger_i 
Less_i:
		ori     x1 , x11 , 195 
		sub     x16 , x19 , x11 
		srai    x16 , x16 , 4 
		and     x16 , x16 , x0 
		addi    x24 , x0 , 0 
		beq     x16 , x24 , Pass 
Bigger_i:
		ori     x1 , x11 , 187 
		sub     x16 , x19 , x11 
		srai    x16 , x16 , 1 
		and     x16 , x16 , x0 
		addi    x24 , x0 , 0 
		beq     x16 , x24 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
