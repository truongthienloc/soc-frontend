.text

#The program checks the ALU instruction in I_type

Main:
		addi    x6 , x0 , 92 
		addi    x10 , x0 , 91 
		sltu    x7 , x6 , x10 
		bltu    x6 , x10 , Less_i 
		bgeu    x6 , x10 , Bigger_i 
Less_i:
		ori     x29 , x6 , 107 
		sub     x8 , x10 , x6 
		srai    x8 , x8 , 4 
		and     x8 , x8 , x0 
		addi    x19 , x0 , 0 
		beq     x8 , x19 , Pass 
Bigger_i:
		ori     x29 , x6 , 69 
		sub     x8 , x10 , x6 
		srai    x8 , x8 , 1 
		and     x8 , x8 , x0 
		addi    x19 , x0 , 0 
		beq     x8 , x19 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
